import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getArtifacts from "app/artifacts/queries/getArtifacts"

const ITEMS_PER_PAGE = 100

export const ArtifactsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ artifacts, hasMore }] = usePaginatedQuery(getArtifacts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {artifacts.map((artifact) => (
          <li key={artifact.id}>
            <Link href={`/artifacts/${artifact.id}`}>
              <a>{artifact.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ArtifactsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Artifacts</title>
      </Head>

      <div>
        <p>
          <Link href="/artifacts/new">
            <a>Create Artifact</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ArtifactsList />
        </Suspense>
      </div>
    </>
  )
}

ArtifactsPage.authenticate = true
ArtifactsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ArtifactsPage
