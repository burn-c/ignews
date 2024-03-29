import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { getStripeJs } from '../../services/stripe-js';

import { api } from '../../services/api';

import styles from './styles.module.scss';

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts')
      return;
    }

    // checkout session create

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }

  }

  const ButtonText = session?.activeSubscription ? 'Go to Posts :) ' : 'Subscribe now'

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {ButtonText}
    </button>
  )
}
