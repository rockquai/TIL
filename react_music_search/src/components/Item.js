import React from 'react';

const Item = (props) => {
	const { info } = props;

	return (
		<tr>
			<td>
				<img src={info.poster} alt="" />
			</td>
			<td>{info.state}</td>
			<td>{info.title}</td>
			<td>{info.singer}</td>
		</tr>
	);
}

export default Item;
