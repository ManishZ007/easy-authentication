import { updateUser } from "@/lib/actions/user.action";

export async function POST(request: Request) {
  try {
    const { email, username, id } = await request.json();

    const response = await updateUser({ id, email, username });

    if (!response.success) {
      return Response.json({
        success: false,
        message: response.message,
      });
    }

    return Response.json({
      success: true,
      message: response.message,
      user: response.updateUser,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "somthing went wrong",
    });
  }
}
