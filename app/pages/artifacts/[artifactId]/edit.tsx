import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getArtifact from "app/artifacts/queries/getArtifact"
import updateArtifact from "app/artifacts/mutations/updateArtifact"
import { ArtifactForm, FORM_ERROR } from "app/artifacts/components/ArtifactForm"

export const EditArtifact = () => {
  const router = useRouter()
  const artifactId = useParam("artifactId", "number")
  const [artifact, { setQueryData }] = useQuery(getArtifact, { id: artifactId })
  const [updateArtifactMutation] = useMutation(updateArtifact)

  return (
    <>
      <Head>
        <title>Edit Artifact {artifact.id}</title>
      </Head>

      <div>
        <h1>Edit Artifact {artifact.id}</h1>
        <pre>{JSON.stringify(artifact)}</pre>

        <ArtifactForm
          submitText="Update Artifact"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateArtifact}
          initialValues={artifact}
          onSubmit={async (values) => {
            try {
              const updated = await updateArtifactMutation({
                id: artifact.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/artifacts/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditArtifactPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditArtifact />
      </Suspense>

      <p>
        <Link href="/artifacts">
          <a>Artifacts</a>
        </Link>
      </p>
    </div>
  )
}

EditArtifactPage.authenticate = true
EditArtifactPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditArtifactPage
