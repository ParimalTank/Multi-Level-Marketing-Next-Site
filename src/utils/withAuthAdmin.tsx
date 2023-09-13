import { redirect, useRouter } from 'next/navigation';
import { cookies } from 'next/headers'

const withAuthAdmin = (Component: any) => {
    const Auth = (props: any) => {

        const cookieStore = cookies()
        const cookie = cookieStore.get('admin_token')

        if (!cookie?.value) {
            return redirect("/");
        }
        return (
            <Component {...props} />
        );
    };
    return Auth;
};

export default withAuthAdmin;