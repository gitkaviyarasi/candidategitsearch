// TODO: Create an interface for the Candidate objects returned by the API

export default interface Candidate{
// readonly Image:string ;
// readonly avatar_url:string ;
// readonly Name:string | null;
// readonly Location:string | null;
// readonly Email:string | null;
// readonly Company:string | null;
// readonly Bio:string | null;

readonly avatar_url: string;
readonly name: string;
readonly login: string;
readonly location: string;
readonly email: string;
readonly company: string;
readonly bio: string;
readonly url: string;
}