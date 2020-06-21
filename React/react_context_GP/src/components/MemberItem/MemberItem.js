import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './MemberItem.sass';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Li = styled.li`
	position: relative;
	width: 326px;	
	padding: 20px;
	list-style: none;
`;

const A = styled.a`
	position: relative;
	display: inline-block;	
	color: #000 ;
	text-decoration: none;
	vertical-align: top;	
`;

const MemberItem = ({ item : { id, name, age, job, image, link, width, height }, removeMember }) => {
	const uniqueId = `item-${id}`;
	const [pressed, setPressed] = useState(false);
	const [dialogClassName, setDialogClassName] = useState('wrap_info');

	const handleShowDialog = (e) => {
		e.preventDefault();

		setPressed(true);
		window.setTimeout(() => {
			setDialogClassName('wrap_info is-active')
		}, 100);
	}

	const handleHideDialog = () => {
		setDialogClassName('wrap_info is-active');	
		
		window.setTimeout(() => {
			setPressed(false);
		}, 400);
	}

	return (
		<Li>
			<A 
				className="link_more"
				href={link} 
				target="_blank" 
				rel="noreferrer noopener"
				onClick={handleShowDialog}
			>	
				<img 
					src={image}
					width={width}
					height={height}
					alt=""
				/>
				<strong id={uniqueId}>이름: {name}</strong>
				<span className="txt_more">자세히 보기</span>
			</A>

			{/*  상세 정보 : is-active 활성화 */}
			<div 
				className={dialogClassName}
				hidden={!pressed}
				role="dialog" 
				aria-modal="false" 
				aria-labelledby={uniqueId}
			> 	
				<p className="desc_info">나이: {age} | 직업: {job}</p>			
			
				<button 
					className="btn_close" 
					type="button" 
					title="닫기" 
					aria-label="정보 닫기"
					onClick={handleHideDialog}
				>
					<span aria-hidden="true">×</span>
				</button>
         	</div>

			<button 
				type="button" 
				className={cx('btn_remove')}
				onClick={() => removeMember(id)}
			>
				삭제
			</button>
		</Li>
	)
};

export default MemberItem;