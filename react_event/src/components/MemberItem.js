import React from 'react';
import styled from 'styled-components';


const Li = styled.li`
	padding: 20px;
	list-style: none;
`;

const A = styled.a`
	display: inline-block;
	color: #000 ;
	text-decoration: none;
	vertical-align: top;	
`;

const Figure = styled.figure`
	width: 326px;	
	margin: 0;
	padding: 0;
`;

const Button = styled.button`
	margin-left: 10px;
	padding: 10px;	
	font-weight: bold;
	font-size: 0.8rem;
	color: #000;
	background-color: #fff;
	border: 2px solid #dadada;
	border-radius: 3px;	
	transition: all 0.25s ease-out;
	vertical-align: top;

	:hover,
	:focus {
		color: #f00;
		border-color: #f00;
	}
`;

const MemberItem = ({ id, name, age, job, image, link, width, height, handleRemoveMember }) => {
	return (
		<Li>
			<A href={link} target="_blank" rel="noreferrer noopener">
				<Figure>
					<img 
						src={image}
						width={width}
						height={height}
						alt=""
					/>
					<figcaption>
						이름: {name} | 나이: {age} | 직업: {job}
					</figcaption>
				</Figure>
			</A>			
			<Button type="button" onClick={() => handleRemoveMember(id)}>삭제</Button>
		</Li>
	);
};

export default MemberItem;