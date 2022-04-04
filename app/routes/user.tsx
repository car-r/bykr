import { requireUserId } from "~/session.server"
import { json, useLoaderData } from "remix";
import { getUserById } from "~/models/user.server";

export const loader = async ({request}: any) => {
    const userId = await requireUserId(request);
    const user = await getUserById(userId)

    return json(user)
}

export default function UserSettings() {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <p>{data.email} settings</p>

        </div>
    )
}