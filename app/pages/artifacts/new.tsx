import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createArtifact from "app/artifacts/mutations/createArtifact"
import { ArtifactForm, FORM_ERROR } from "app/artifacts/components/ArtifactForm"

const NewArtifactPage: BlitzPage = () => {
  const router = useRouter()
  const [createArtifactMutation] = useMutation(createArtifact)

  return (
    <div>
      <h1>Create New Artifact</h1>

      <ArtifactForm
        submitText="Create Artifact"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateArtifact}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const artifact = await createArtifactMutation(values)
            router.push(`/artifacts/${artifact.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/artifacts">
          <a>Artifacts</a>
        </Link>
      </p>
    </div>
  )
}

NewArtifactPage.authenticate = true
NewArtifactPage.getLayout = (page) => <Layout title={"Create New Artifact"}>{page}</Layout>

export default NewArtifactPage
