import { useState } from "react";
import { motion } from "framer-motion";
import { useReveal } from "../hooks/useReveal";
import SplitReveal from "./SplitReveal";

export default function MoreJoy() {
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1 });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="morejoy" ref={ref}>
      <div className="container morejoy__inner">
        <div className="morejoy__pill reveal">
          <span className="script" style={{ fontSize: 26, color: "#FFF" }}>
            PAUZ
          </span>
        </div>

        <SplitReveal as="h2" className="morejoy__title">
          More Joy
          <br /> More Often
        </SplitReveal>

        <form
          className="morejoy__form reveal"
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
          <motion.button
            type="submit"
            className="btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {sent ? "Joined ✓" : "Notify Me"}
          </motion.button>
        </form>

        <p className="morejoy__note reveal">
          Get early access to drops, member pricing and a little joy in your
          inbox.
        </p>
      </div>

      <style>{`
        .morejoy {
          background:#fbf6ed;
          padding: clamp(50px, 7vw, 90px) 0 clamp(70px, 9vw, 120px);
          text-align: center;
          color: var(--maroon-deep);
          overflow: hidden;
        }
        .morejoy__pill {
          display: inline-block;
          background: #2e7d32;
          border-radius: 999px;
          padding: 8px 22px;
          margin-bottom: 1.4rem;
          box-shadow: 0 6px 18px rgba(94,28,18,.12);
        }
        .morejoy__title {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          font-size: clamp(3rem, 13vw, 10rem);
          line-height: .82;
          transform: scaleX(.9);
          color: var(--maroon-deep);
          margin-bottom: 2rem;
        }
        .morejoy__form {
          display: inline-flex;
          gap: 8px;
          background: var(--cream);
          padding: 7px 7px 7px 20px;
          border-radius: 999px;
          box-shadow: 0 10px 30px rgba(94,28,18,.14);
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
        .morejoy__form input {
          border: none;
          background: transparent;
          font-family: var(--font-mono);
          font-size: .8rem;
          min-width: 200px;
          outline: none;
          color: var(--maroon-deep);
        }
        .morejoy__form input::placeholder { color: rgba(94,28,18,.5); }
        .morejoy__note {
          font-family: var(--font-mono);
          font-size: .66rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          margin-top: 1.2rem;
          opacity: .7;
        }
      `}</style>
    </section>
  );
}
