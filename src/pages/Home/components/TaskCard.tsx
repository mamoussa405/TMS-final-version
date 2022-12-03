import React from 'react';
import { MDBCard, MDBCol } from 'mdbreact';
interface Props {
	title: string;
	value: number;
}

export const TaskCard: React.FC<Props> = ({ title, value }) => {
	return (
		<MDBCol xl='4' md='6' className='mb-5'>
			<MDBCard cascade className='cascading-admin-card text-center py-2'>
				<div className='admin-up'>
					<div className='data'>
						<p
							style={{ letterSpacing: '1.5px' }}
							className='font-weight-bold  black-text text-uppercase'>
							{title}
						</p>
						<h4 className='font-weight-bold dark-grey-text'>
							{value}
						</h4>
					</div>
				</div>
			</MDBCard>
		</MDBCol>
	);
};
