import React from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBProgress } from 'mdbreact';

interface Props {
	title: string;
	description: string;
	color: string;
	value: number;
	total: number;
}

export const ProgressCard: React.FC<Props> = ({
	title,
	description,
	color,
	value,
	total,
}) => {
	return (
		<MDBCol xl='3' md='6' className='mb-4'>
			<MDBCard color={color} className='classic-admin-card white-text'>
				<MDBCardBody>
					<div className='float-right'>
						<MDBIcon icon='money-bill-alt' />
					</div>
					<h5 style={{ fontWeight: 'bold' }}>{title}</h5>
					{/*to display the value itself not the percentage for the progress bar*/} {/* eslint-disable-line*/}
					<h4>
						{isNaN(Math.round((value / 100) * total))
							? 0
							: Math.round((value / 100) * total)}
					</h4>
				</MDBCardBody>

				<MDBProgress
					value={value}
					barClassName='bg-white grey darken-4'
					height='8px'
					wrapperStyle={{ opacity: '.8' }}
				/>

				<MDBCardBody>
					<p dangerouslySetInnerHTML={{ __html: description }}></p>
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	);
};
