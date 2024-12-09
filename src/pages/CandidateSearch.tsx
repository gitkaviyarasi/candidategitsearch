import  { useEffect, useState } from 'react';
// import { searchGithub,searchGithubUser } from '../api/API.tsx'; 
import { searchGithub } from '../api/API.tsx'; 

interface Candidate {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
  email: string;
  company: string;
  html_url: string;

  
}

const CandidateSearchApp = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // List of candidates fetched
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null); // Current candidate to display
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]); // List of saved candidates
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      // const user = await searchGithubUser('Harun-N');
      // console.log(user);
      const data = await searchGithub();
      setCandidates(data);
      setCurrentCandidate(data[0] || null);
      setLoading(false);
      
    };

    fetchCandidates();
  }, []);

  const handleAccept = () => {
    if (currentCandidate) {
      setSavedCandidates((prev) => [...prev, currentCandidate]);
      handleNext();
    }
  };

  const handleReject = () => {
    handleNext();
  };

  const handleNext = () => {
    if (candidates.length > 0) {
      const nextCandidates = candidates.slice(1);
      setCandidates(nextCandidates);
      setCurrentCandidate(nextCandidates[0] || null);
    } else {
      setCurrentCandidate(null);
    }
  };

  useEffect(() => {
    // Persist saved candidates to localStorage
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  useEffect(() => {
    // Load saved candidates from localStorage
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  if (loading) return <p>Loading candidates...</p>;
  if (!currentCandidate) return <p>No more candidates available.</p>;

  return (
    <div>
      <h1>Candidate Search Application</h1>
      <div>
        <img
          src={currentCandidate.avatar_url}
          alt={currentCandidate.name}
          style={{ width: '100px', borderRadius: '50%' }}
        />
        <h2>{currentCandidate.name || 'Name not available'}</h2>
        <p>Username: {currentCandidate.login}</p>
        <p>Location: {currentCandidate.location || 'Location not available'}</p>
        <p>Email: {currentCandidate.email || 'Email not available'}</p>
        <p>Company: {currentCandidate.company || 'Company not available'}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
          GitHub Profile
        </a>
        <div>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      </div>
      <h2>Saved Candidates</h2>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img
                src={candidate.avatar_url}
                alt={candidate.name}
                style={{ width: '50px', borderRadius: '50%' }}
              />
              <p>{candidate.name || 'Name not available'}</p>
              <p>Username: {candidate.login}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidateSearchApp;
