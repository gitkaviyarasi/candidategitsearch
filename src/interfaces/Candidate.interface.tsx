// TODO: Create an interface for the Candidate objects returned by the API

export default interface Candidate{

readonly avatar_url: string;
readonly name: string;
readonly login: string;
readonly location: string;
readonly email: string;
readonly company: string;
readonly bio: string;

}