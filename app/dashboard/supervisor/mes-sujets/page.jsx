import SubjectsList from "@/app/components/subjects_list/SubjectsList";

export default async function Users() {
  return (
      <SubjectsList
          listType="SUPERVISOR"
      />
  )
}
