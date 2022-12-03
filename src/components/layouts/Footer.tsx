import React from 'react';
import { MDBFooter } from 'mdbreact';

interface Props {
	className?: string;
	style?: React.CSSProperties;
}

// Footer of application
const Footer: React.FC<Props> = ({ className, style }) => {
	return (
		<MDBFooter className={className} style={{ ...style, zIndex: 100 }}>
			<p className='footer-copyright mb-0 py-2 text-center'>
				&copy; {new Date().getFullYear()} Copyright -{' '}
				<a href='https://www.jesagroup.com'> JESA </a>
			</p>
		</MDBFooter>
	);
};

export default Footer;
