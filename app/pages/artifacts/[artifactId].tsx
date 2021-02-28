import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getArtifact from "app/artifacts/queries/getArtifact"
import deleteArtifact from "app/artifacts/mutations/deleteArtifact"

export const Artifact = () => {
  const router = useRouter()
  const artifactId = useParam("artifactId", "number")
  const [deleteArtifactMutation] = useMutation(deleteArtifact)
  const [artifact] = useQuery(getArtifact, { id: artifactId })

  return (
    <>
      <Head>
        <title>Artifact {artifact.id}</title>
      </Head>

      <div>
        <h1>Artifact {artifact.id}</h1>
        <pre>{JSON.stringify(artifact, null, 2)}</pre>

        <Link href={`/artifacts/${artifact.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteArtifactMutation({ id: artifact.id })
              router.push("/artifacts")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowArtifactPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/artifacts">
          <a>Artifacts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Artifact />
      </Suspense>
    </div>
  )
}

ShowArtifactPage.authenticate = true
ShowArtifactPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowArtifactPage
