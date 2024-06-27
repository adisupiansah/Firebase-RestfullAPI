import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from '../Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider } from "firebase/auth";
import { ref, set } from "firebase/database";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // anter user ke localStorage
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null;
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            if (user) {
                // anter user ke local storage
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                localStorage.removeItem('user')
            }
        })
        return unsubscribe
    }, [])


    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const register = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCrenditial) => {
                const user = userCrenditial.user
                // tambahkan data user ke realtime database
                set(ref(database, 'users/' + user.uid), {
                    email: user.email
                })

                alert('Registrasi berhasil')
                document.location.href = '/'

            })
            .catch((error) => {
                console.error(error)
            })
    }

    const logout = () => {
        return signOut(auth)
            .then(() => {
                localStorage.removeItem('user')
            })
    }

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                set(ref(database, 'users/' + user.uid), {
                    email: user.email
                })
            })
            .catch((error) => {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    handleAccountExistsWithDifferentCredential(error)
                } else {

                    throw error
                }
            })
    }

    const loginWithFacebook = () => {
        const Facebookprovider = new FacebookAuthProvider()
        Facebookprovider.addScope('email')
        return signInWithPopup(auth, Facebookprovider)
            .then((result) => {
                const user = result.user
                set(ref(database, 'users/' + user.uid), {
                    username: user.displayName,
                    email: user.email
                })
            })
            .catch((error) => {
                if (error.code = 'auth/account-exists-with-different-credential') {
                    handleAccountExistsWithDifferentCredential(error)
                } else {

                    throw error
                }
            })
    }

    const handleAccountExistsWithDifferentCredential = async (error) => {
        const email = error.customData.email;
        const pendingCredential = error.credential;
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) {
            const password = prompt('Enter your password:');
            const credential = EmailAuthProvider.credential(email, password);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await linkWithCredential(userCredential.user, pendingCredential);
        } else if (signInMethods.includes(GoogleAuthProvider.PROVIDER_ID)) {
            const result = await signInWithPopup(auth, googleProvider);
            await linkWithCredential(result.user, pendingCredential);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loginWithGoogle, loginWithFacebook }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);