let total = 0; let subscribers = 0;
export function addDonation(amount:number){ total += amount * 0.02; }
export function getDonationTotal(){ return total; }
export function addSubscriber(){ subscribers += 1; }
