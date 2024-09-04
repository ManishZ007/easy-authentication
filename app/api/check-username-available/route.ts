import { checkUsernameIsValid } from "@/lib/actions/user.action";
import { usernameValidation } from "@/lib/schemas/signUpSchema";
import z from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryParam = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;

    const res = await checkUsernameIsValid(username);

    if (!res.success) {
      return Response.json(
        {
          success: res.success,
          message: res.message,
        },
        {
          status: 409,
        }
      );
    }

    return Response.json(
      {
        success: res.success,
        message: res.message,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "somthing went wrong",
      },
      { status: 500 }
    );
  }
}
