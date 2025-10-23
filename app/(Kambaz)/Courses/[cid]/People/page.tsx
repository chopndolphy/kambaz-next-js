import { redirect } from "next/navigation";
export default async function People({
    params,
}: Readonly<{ params: Promise<{ cid: string }> }>) {
    const { cid } = await params;
    return redirect(`/Courses/${cid}/People/Table`);
}
