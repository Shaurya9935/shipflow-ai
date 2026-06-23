"use client";
import { signInWithGithub } from "@repo/services/auth/src/client";
import { useEffect, useState } from "react";

export default function LoginPage() {

  return (
    <button onClick={() => signInWithGithub()}>
      Log in with GitHub
    </button>
  );
}