import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout.component";
import { useState, useEffect } from "react";
import { redirectUser } from "../utils/auth.utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);

  let pageProps = {};

  const protectedRoutes = ctx.pathname === "/" || ctx.pathname === "/messages";

  if (!token) {
    destroyCookie(ctx, "token");

    protectedRoutes && redirectUser(ctx, "/signin");
  } else {
    try {
      const res = await axios.get(`http://localhost:3000/api/auth`, {
        headers: { Authorization: token },
      });
      const { user } = res.data;

      if (user) {
        !protectedRoutes && redirectUser(ctx, "/");
      }
      pageProps.user = user;
    } catch (err) {
      console.error(err);
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/signin");
    }
  }

  return { pageProps };
};

export default MyApp;
