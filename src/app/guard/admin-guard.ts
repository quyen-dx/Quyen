import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const user = {
    email: "a@gmail.com",
    role: "admin"
  }
  if (user.role === 'admin') return true;
  const router = new Router()
  router.navigate(["/"])
  return false
};
