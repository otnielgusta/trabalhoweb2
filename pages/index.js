import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Host from '../host';
import swal from 'sweetalert';
import { useEffect } from 'react';
import { auth } from '../controllers/cabelereiro_controller';

export default function Home() {
  const router = useRouter();



  useEffect(() => {
    if (cookie.get("session_token")) {
      auth(router, "home");
    } else {
      typeof window !== 'undefined' && router.push({
        pathname: '/login',
      });
    }
  }, [])



}
