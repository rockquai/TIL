import React from 'react';
import Item from './Item';
import './List.css';

class List extends React.Component {
	static defaultProps = {
		list: [],   
	}

	shouldComponentUpdate(nextProps, nextState) {		
		return nextProps.data !== this.props.data;
	}

    render() {
		const { data } = this.props;
		const list = data.map((info) => ( <Item key={info.id} info={info} />) );
		
        return (
            <div className="List">
				<table>
					<caption class="ir_caption">지니 뮤직 랭킹</caption>
					<colgroup>
						<col className="w1" />
						<col className="w2" />
						<col className="w3" />
						<col className="w4" />
					</colgroup>

					<thead>
						<tr>
							<th>앨범</th>
							<th>등폭</th>
							<th>노래명</th>
							<th>가수명</th>
						</tr>
					</thead>

					<tbody>
						{list}
					</tbody>
				</table>
            </div>
        );
    }
}

export default List;
