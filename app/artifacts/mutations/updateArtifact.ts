import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateArtifact = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateArtifact),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const artifact = await db.artifact.update({ where: { id }, data })

    return artifact
  }
)
