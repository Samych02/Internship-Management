"use server"
import SubjectsList from "@/app/dashboard/supervisor/SubjectsList";

export default async function Users() {
  const elements = [
    {id: 6, title: 12.011, status: 'PENDING', specialistComment: 'Carbon', path: ""},
    {id: 7, title: 14.007, status: 'PENDING', specialistComment: 'Nitrogen', path: ""},
    {id: 39, title: 88.906, status: 'REJECTED', specialistComment: 'Yttrium', path: ""},
    {id: 56, title: 137.33, status: 'REJECTED', specialistComment: 'Barium', path: ""},
    {id: 58, title: 140.12, status: 'REJECTED', specialistComment: 'Cerium', path: ""},
  ];

  return (
      <SubjectsList elements={elements}/>
  )


}
