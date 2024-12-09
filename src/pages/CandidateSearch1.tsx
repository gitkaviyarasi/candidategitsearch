import  { useEffect, useState } from 'react';
 import { searchGithub,searchGithubUser } from '../api/API.tsx'; 
//import { searchGithub } from '../api/API.tsx'; 
import type Candidate from '../interfaces/Candidate.interface';


const CandidateSearch1 = () => {
    const [candidates,setCandidates] = useState<Candidate[]>([]);
    const [currentCandidate,setCurrentCandidate] = useState<Candidate | null>(null);
    const [savedCandidates,setSavedCandidates] = useState<Candidate[]>([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
          setLoading(true);
          try {
            const candidateData = await searchGithub(); // Fetch candidate usernames
            console.log('Fetched candidates:', candidateData);
    
            // Fetch detailed user data for all candidates
            const detailedCandidates: Candidate[] = await Promise.all(
              candidateData.map((candidate: { login: string }) => searchGithubUser(candidate.login))
            );
            console.log('Fetched detailed candidates:', detailedCandidates);
    
            setCandidates(detailedCandidates); // Save all candidates
            setCurrentCandidate(detailedCandidates[0] || null); // Set the first candidate as current
          } catch (error) {
            console.error('Error fetching candidates:', error);
          } finally {
            setLoading(false); // Stop loading
          }
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

    if (loading) return <p>Loading candidates...</p>;
  if (!currentCandidate) return <p>No more candidates available.</p>;


    return (
        <>
        <h2>Candidate Search</h2>
        <div>
          <img src={currentCandidate?.avatar_url} alt={currentCandidate?.name || 'No Name'} className='himage'/>
          </div>
          <div className = "hdetails">
         <p>Name: {currentCandidate.login || "Name is not available"}</p> 
         <p>Location: {currentCandidate.location || 'Location not available'}</p>
        <p>Email: {currentCandidate.email || 'Email not available'}</p>
        <p>Company: {currentCandidate.company || 'Company not available'}</p>
         <p>Bio: {currentCandidate.bio}</p>
            {/* <p>url:{currentCandidate.url} </p> */}
        </div>
        <div>
         <button onClick={handleAccept} className = "btnadd">+</button>
         <button onClick={handleReject} className ="btnreject">-</button>
        </div>

        

        </>
    )

}    
export default CandidateSearch1;



