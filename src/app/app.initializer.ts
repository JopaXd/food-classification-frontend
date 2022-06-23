import { UserService } from './user.service';

export function appInitializer(userService: UserService) {

    return () => new Promise((resolve: any) => {
        // attempt to refresh token on app start up to auto authenticate
        userService.getCurrentUser()
            .subscribe()
            .add(resolve);
    });
}