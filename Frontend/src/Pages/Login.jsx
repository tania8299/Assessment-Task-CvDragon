import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/Images/banner.svg";
import ReactCountryFlag from "react-country-flag";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Login = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (phone) {
                navigate('/dashboard');
            } else {
                setError('Please enter your mobile number');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            
            <div className="w-1/2 h-[98vh] relative rounded-r-2xl">
                <img
                    src={bgImage}
                    alt="Background"
                    className="h-full w-full object-contain rounded-r-2xl"
                />
            </div>


            <div className="w-1/2 flex items-center justify-center p-8">
                <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8 space-y-8">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-bold text-yellow-600 leading-snug">Jai Jinendra!</h2>
                        <p className="mt-1 text-4xl font-semibold text-gray-800 leading-tight">
                            Welcome to Jain <br />Vishva Bharti!
                        </p>
                        <p className="text-sm text-gray-500 my-8 leading-relaxed">
                            Enter your mobile number to access your account
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        
                        <div>
                            <label htmlFor="phone" className="sr-only">
                                Mobile Number
                            </label>
                            <div className="flex w-full border border-gray-200 rounded-lg overflow-hidden">
                                <span className="inline-flex items-center gap-1 px-3  text-gray-700 text-sm">
                                    <ReactCountryFlag
                                        countryCode="IN"
                                        svg
                                        style={{ width: '1em', height: '1em' }}
                                    />
                                    <span className='text-xs'>+91</span>
                                    <ChevronDownIcon className="w-8 h-4 text-black" />
                                </span>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    className="appearance-none block w-full px-3 py-2 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                    placeholder="Mobile Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                        
                            <p className="my-4 text-xs text-gray-500">
                                You will receive an SMS verification that may apply message and data rates.
                            </p>
                        </div>

                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 text-sm font-semibold rounded-xl text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                
                        <div className="text-center">
                            <a href="#" className="text-base font-medium text-yellow-600 hover:text-yellow-700">
                                Forgot password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;