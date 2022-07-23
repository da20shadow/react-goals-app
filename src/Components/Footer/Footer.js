import {Link} from "react-router-dom";
import {BsFacebook, BsInstagram, BsPinterest, BsTwitter} from 'react-icons/bs';

function Footer(){
    return(
        <footer className={'bg-dark-blue pb-4 mt-10'}>

            <div className="flex justify-center py-8">
                <Link to={'/'} className={'mx-2 text-lg text-light-blue hover:underline'}>About</Link>
                <Link to={'/'} className={'mx-2 text-lg text-light-blue hover:underline'}>Blog</Link>
                <Link to={'/'} className={'mx-2 text-lg text-light-blue hover:underline'}>Terms</Link>
                <Link to={'/'} className={'mx-2 text-lg text-light-blue hover:underline'}>Privacy Policy</Link>
                <Link to={'/'} className={'mx-2 text-lg text-light-blue hover:underline'}>Contact us</Link>
            </div>

            <div className="flex justify-center">
                <BsFacebook size={'24px'} color={'#074096'} className={'mx-2 drop-shadow-lg rounded-full bg-white h-6 w-6 cursor-pointer'}/>
                <BsInstagram size={'24px'} color={'gray'} className={'mx-2 drop-shadow-lg rounded-md bg-white h-6 w-6 cursor-pointer'}/>
                <BsTwitter size={'24px'} color={'#2e84fa'} className={'mx-2 drop-shadow-lg rounded-md bg-white h-6 w-6 cursor-pointer'}/>
                <BsPinterest size={'24px'} color={'red'} className={'mx-2 drop-shadow-lg rounded-full bg-white h-6 w-6 cursor-pointer'}/>
            </div>

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-light-gray">&copy; 2022 <strong className={'text-light-blue'}>@da20shadow</strong> All rights reserved.</p>
            </div>

        </footer>
    );
}
export default Footer;