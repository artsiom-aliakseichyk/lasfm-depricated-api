import React from 'react';
import ReactDOM from 'react-dom';


class Band extends React.Component {
	handleClick() {
		console.log("Event handler!");
	}

	render() {
		return (
			<div className="band col-md-4 col-sm-6 col-xs-12">
				<h4>{this.props.bandName}</h4>
				<img className="band-img img-responsive" src={this.props.bandImg} alt={this.props.bandName}/>
				<a className="band-url" href={this.props.bandUrl} onClick={this.handleClick}>{this.props.bandName}</a>
			</div>
		)
	}
}
class BandWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bands: {}
		}
	}

	componentDidMount() {
		let lastFmReq = "http://ws.audioscrobbler.com/2.0/?api_key=YOUR_API_KEY_HERE&method=user.getPersonalTags&user=YOUR_USER_NAME&tag=TAG_NAME&taggingtype=artist&format=json";
		this.serverRequest = $.get(lastFmReq, function(data) {
			let bands = data.taggings.artists.artist;
			this.setState({
				bands: bands
			});
		}.bind(this));
	}

	render() {
		let bands = this.state.bands;
		let bandArr = [];
		if (bands.length) {
			return (
				<div className="bandWrapper">
					{bands.map(function(band, i) {
						return <Band key={i} bandName={band.name} bandUrl={band.url} bandImg={band.image[3]['#text']} />;
					})}
				</div>
			)
		}
		else {
			return (
				<div className="bandWrapper">
					<h3>Loooading....</h3>
				</div>
			)	
		}
		


	}
}

ReactDOM.render(<BandWrapper />, document.querySelector("body > .container"));
