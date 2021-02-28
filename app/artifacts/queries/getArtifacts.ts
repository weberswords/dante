import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetArtifactsInput
  extends Pick<Prisma.ArtifactFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetArtifactsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: artifacts, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.artifact.count({ where }),
      query: (paginateArgs) => db.artifact.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      artifacts,
      nextPage,
      hasMore,
      count,
    }
  }
)
