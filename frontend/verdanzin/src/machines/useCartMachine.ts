import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { createActor } from 'xstate';
import { cartMachine } from './cartMachine';

export function useCartMachine(initialUserEmail?: string | null) {
  const actor = useMemo(() => {
    return createActor(cartMachine);
  }, []);

  useEffect(() => {
    actor.start();
    if (initialUserEmail) {
      actor.trigger.setUser({ email: initialUserEmail });
    }
    return () => {
      actor.stop();
    };
  }, [actor, initialUserEmail]);

  const snapshot = useSyncExternalStore(
    (callback) => {
      const subscription = actor.subscribe(callback);
      return () => subscription.unsubscribe();
    },
    () => actor.getSnapshot(),
    () => actor.getSnapshot()
  );

  return {
    actor,
    snapshot,
    state: snapshot.value,
    context: snapshot.context,
    trigger: actor.trigger,
    send: actor.send.bind(actor)
  };
}
