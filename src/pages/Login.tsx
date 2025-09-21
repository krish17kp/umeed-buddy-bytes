import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { toast } from "sonner";

const card =
  "max-w-md mx-auto bg-[#0f1429] border border-[#232a5a] rounded-2xl p-8 shadow-2xl text-[#e9ecff]"; // removed mt-20
const input =
  "w-full bg-[#151a38] border border-[#2a3166] rounded-xl px-4 py-3 outline-none focus:border-[#5ad2c7] placeholder-[#a9b1ff80]";
const btn =
  "w-full rounded-xl px-4 py-3 font-semibold transition active:translate-y-[1px]";
const tab = (on: boolean) =>
  `px-4 py-2 rounded-lg ${
    on ? "bg-[#22285b] border border-[#2a3166] text-white" : "text-[#a9b1ff]"
  }`;

export default function Login() {
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const nav = useNavigate();

  // Finish email-link sign-in if redirected back
  if (
    typeof window !== "undefined" &&
    isSignInWithEmailLink(auth, window.location.href)
  ) {
    const cached = localStorage.getItem("emailForSignIn");
    if (cached) {
      signInWithEmailLink(auth, cached, window.location.href)
        .then(() => {
          localStorage.removeItem("emailForSignIn");
          toast.success("Signed in successfully!");
          nav("/");
        })
        .catch((e) => setMsg(e.message));
    }
  }
  // Complete Google redirect if popup was blocked
  getRedirectResult(auth).catch((e) => setMsg(e.message));

  async function doPassword(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast.success("Signed in successfully!");
      nav("/");
    } catch (e: any) {
      if (e?.code === "auth/wrong-password") {
        setMsg("Incorrect password. Please try again.");
      } else if (e?.code === "auth/user-not-found") {
        setMsg("No account found with this email. Try signing up.");
      } else if (e?.code === "auth/invalid-email") {
        setMsg("That doesn’t look like a valid email.");
      } else if (e?.code === "auth/too-many-requests") {
        setMsg("Too many failed attempts. Try again later.");
      } else if (e?.code === "auth/user-disabled") {
        setMsg("This account has been disabled.");
      } else if (e?.code === "auth/invalid-credential") {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          if (methods.includes("google.com")) {
            setMsg(
              "This email is registered with Google. Please use 'Continue with Google' below."
            );
          } else {
            setMsg("Invalid credentials. Please try again.");
          }
        } catch {
          setMsg("Invalid credentials. Please try again.");
        }
      } else {
        setMsg(`Error: ${e.message}`);
      }
    } finally {
      setBusy(false);
    }
  }

  async function doOTP(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/auth/login`,
        handleCodeInApp: true,
      });
      localStorage.setItem("emailForSignIn", email);
      setMsg(
        "We sent a sign-in link to your email. Open it on this device to continue."
      );
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function doGoogle() {
    setBusy(true);
    setMsg(null);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      nav("/");
    } catch (e: any) {
      if (e?.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, googleProvider);
      } else {
        setMsg(e.message);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#0b0f24] pt-6 md:pt-8">
      <div className={card + " mt-0"}>
        <h1 className="text-2xl font-bold text-center">
          Welcome to InnovativeMind
        </h1>
        <p className="text-center text-[#a9b1ff] mb-6">
          A privacy-first community for health & wellness
        </p>

        <div className="flex gap-2 justify-center mb-6">
          <button
            type="button"
            className={tab(mode === "password")}
            onClick={() => setMode("password")}
          >
            Password
          </button>
          <button
            type="button"
            className={tab(mode === "otp")}
            onClick={() => setMode("otp")}
          >
            Email OTP
          </button>
        </div>

        {mode === "password" ? (
          <form className="space-y-4" onSubmit={doPassword}>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                className={input}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                className={input}
                type="password"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            {msg && (
              <p className="text-[#ffd56b]" aria-live="polite">
                {msg}
              </p>
            )}
            <button
              className={`${btn} bg-[#5ad2c7] text-[#0b1126] disabled:opacity-60`}
              disabled={busy}
              type="submit"
            >
              {busy ? "Signing in…" : "Sign In"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={doOTP}>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                className={input}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {msg && (
              <p className="text-[#ffd56b]" aria-live="polite">
                {msg}
              </p>
            )}
            <button
              className={`${btn} bg-[#b39dfb] text-[#0b1126] disabled:opacity-60`}
              disabled={busy}
              type="submit"
            >
              {busy ? "Sending…" : "Send sign-in link"}
            </button>
          </form>
        )}

        <div className="mt-6">
          <div className="relative text-center my-4">
            <span className="px-3 text-[#a9b1ff] text-sm">or</span>
          </div>
          <button
            onClick={doGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-xl px-4 py-3 font-semibold bg-[#22285b] border border-[#2a3166] hover:bg-[#262d64] transition"
          >
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="text-center mt-4 text-[#a9b1ff]">
          Don’t have an account?{" "}
          <Link className="text-[#5ad2c7]" to="/auth/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
