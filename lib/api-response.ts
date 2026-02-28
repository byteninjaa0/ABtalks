import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export function apiSuccess<T>(data: T, message = "OK") {
  return NextResponse.json({
    success: true,
    message,
    data,
  });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}
