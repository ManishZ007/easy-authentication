import dbConnect from "@/lib/database/dbConnect";
import UserModel from "@/lib/database/models/User";

export const POST = async (request: Request) => {
  try {
    await dbConnect();

    const { identifier } = await request.json();

    const deleteUser = await UserModel.findByIdAndDelete(identifier);

    if (!deleteUser) {
      return Response.json({
        success: false,
        message: "deleting user fail",
      });
    }

    return Response.json({
      success: true,
      message: "user delete successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "somthing went wrong",
      },
      {
        status: 500,
      }
    );
  }
};
