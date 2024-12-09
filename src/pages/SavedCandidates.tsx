import  { useEffect, useState, useMemo } from 'react';
import type Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
    const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]); // List of saved candidates
    const [filterText, setFilterText] = useState(''); // Filter based on a text field
    const [sortBy, setSortBy] = useState<'name' | 'location' | 'company' | null>(null); // Sort by criteria

    useEffect(() => {
        // Load saved candidates from localStorage
        const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
        setSavedCandidates(saved);
    }, []);

    const filterCandidates = (candidates: Candidate[]) => {
        if (!filterText) return candidates;
        return candidates.filter((candidate) =>
            (candidate.name || '').toLowerCase().includes(filterText.toLowerCase()) ||
            (candidate.location || '').toLowerCase().includes(filterText.toLowerCase()) ||
            (candidate.company || '').toLowerCase().includes(filterText.toLowerCase())
        );
    };

    const sortCandidates = (candidates: Candidate[]) => {
        if (!sortBy) return candidates;
        return [...candidates].sort((a, b) => {
            const valueA = (a[sortBy] || '').toLowerCase();
            const valueB = (b[sortBy] || '').toLowerCase();
            return valueA.localeCompare(valueB);
        });
    };

    const filteredAndSortedCandidates = useMemo(() => {
        return sortCandidates(filterCandidates(savedCandidates));
    }, [savedCandidates, filterText, sortBy]);

    const handleReject = (candidateToReject: Candidate) => {
        const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== candidateToReject.login);
        setSavedCandidates(updatedCandidates);
        localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    };

    return (
        <div>
            <h2>Potential Candidates</h2>

            {savedCandidates.length === 0 ? (
                <p>No candidates have been saved yet.</p>
            ) : (
                <div>
                    <div className="filter"> 
                      
                        <h3>Filter Candidates</h3>
                        <input
                            type="text"
                            placeholder="Search by name, location, or company"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />

                        <h3>Sort Candidates</h3>
                        <select
                            value={sortBy || ''}
                            onChange={(e) => setSortBy(e.target.value as 'name' | 'location' | 'company' | null)}
                        >
                            <option value="">No Sorting</option>
                            <option value="name">Name</option>
                            <option value="location">Location</option>
                            <option value="company">Company</option>
                        </select>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Email</th>
                                <th scope="col">Company</th>
                                <th scope="col">Bio</th>
                                <th scope="col">Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedCandidates.map((candidate, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={candidate.avatar_url}
                                            alt={"Image not available"}
                                            className="image"
                                            style={{ width: '50px',alignItems:'center', marginLeft:'15px'}}
                                        />
                                    </td>
                                    <td>{candidate.name || 'Name not available'}</td>
                                    <td>{candidate.location || 'Location not available'}</td>
                                    <td>{candidate.email || 'Email not available'}</td>
                                    <td>{candidate.company || 'Company not available'}</td>
                                    <td>{candidate.bio || 'Bio not available'}</td>
                                    <td>
                                        <button
                                            className="sbtnreject"
                                            onClick={() => handleReject(candidate)}
                                        >
                                            -
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SavedCandidates;
