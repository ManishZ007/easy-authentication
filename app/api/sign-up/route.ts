import { createUser } from "@/lib/actions/user.action";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, username, email, password } =
      await request.json();

    const hashPassword = await bcrypt.hash(password, 10);

    const user = {
      firstName,
      lastName,
      username,
      email,
      password: hashPassword,
    };

    const newUser = await createUser(user);

    if (!newUser.success) {
      return Response.json(
        {
          success: false,
          message: newUser.message,
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: newUser.message,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error while creating user", error);
    return Response.json(
      {
        success: false,
        message: "Error while creating user",
      },
      {
        status: 500,
      }
    );
  }
}
