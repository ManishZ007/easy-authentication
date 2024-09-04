"use server";

import dbConnect from "../database/dbConnect";
import UserModel from "../database/models/User";

export const createUser = async (user: CreateUserProps) => {
  try {
    await dbConnect();

    const newUser = await UserModel.create(user);

    if (!newUser) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "user creation fail some database error",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "user created successfully",
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};

export const loginUser = async (identifier: string) => {
  try {
    await dbConnect();

    const existUser = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!existUser) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "user not found",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "user logged in successfully",
        user: existUser,
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};

export const checkUsernameIsValid = async (username: string) => {
  try {
    await dbConnect();

    const user = await UserModel.findOne({ username });

    if (user) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "username is already taken",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "username is available",
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};

export const updateUser = async (user: UpdateUserProps) => {
  try {
    await dbConnect();

    const updateUser = await UserModel.findByIdAndUpdate(
      user.id,
      {
        email: user.email,
        username: user.username,
      },
      {
        new: true,
      }
    );

    if (!updateUser) {
      return JSON.parse(
        JSON.stringify({
          success: false,
          message: "update user faile",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "user update successfully",
        updateUser,
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        message: "somthing went wrong",
      })
    );
  }
};
