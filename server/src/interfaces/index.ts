interface iVacancy {
    readonly id?: number;
    title: string;
    description: string;
    logo?: string;
}
  
interface iResponse {
    userEmail?: string;
    vacancyId?: number;
}
  
  export { iVacancy, iResponse };