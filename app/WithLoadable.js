/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Toast } from 'native-base';
import { ButtonOverlay, LoadingDisplay } from './metaComponents';

export default function WithLoadable(WrappedComponent) {
	return class LoadableComponent extends React.Component {
		constructor(props) {
			super(props);

			this.showLoading = this.showLoading.bind(this);
			this.hideLoading = this.hideLoading.bind(this);
			this.toastSuccess = this.toastSuccess.bind(this);
			this.toastDanger = this.toastDanger.bind(this);
			this.buttonOverlay = this.buttonOverlay.bind(this);
			this.closeButtonOverlay = this.closeButtonOverlay.bind(this);
			this.loadable = {
				showLoading: this.showLoading,
				hideLoading: this.hideLoading,
				toastSuccess: this.toastSuccess,
				toastDanger: this.toastDanger,
				buttonOverlay: this.buttonOverlay,
				closeButtonOverlay: this.closeButtonOverlay,
				visibleDisplays: {
					loading: false,
					buttonOverlay: false
				}
			};

			this.state = { loadingText: null, buttonOverlayData: null };
		}

		showLoading(loadingText) {
			this.loadable.visibleDisplays.loading = true;
			this.setState({ loadingText });
		}

		hideLoading() {
			this.loadable.visibleDisplays.loading = false;
			this.setState({ loadingText: null });
		}

		toast(text, type, duration = 4000) {
			Toast.show({ text, type, duration });
		}

		toastSuccess(text) {
			this.toast(text, 'success');
		}

		toastDanger(text) {
			this.toast(text, 'danger');
		}

		buttonOverlay(titleText, buttonText, buttonType, onButtonPress) {
			const buttonOverlayData = {
				titleText,
				buttonText,
				buttonType,
				onButtonPress,
				onClosePress: this.closeButtonOverlay
			};

			this.loadable.visibleDisplays.buttonOverlay = true;
			this.setState({ buttonOverlayData });
		}

		closeButtonOverlay() {
			this.loadable.visibleDisplays.buttonOverlay = false;
			this.setState({ buttonOverlayData: null });
		}

		buildLoadingDisplay() {
			return <LoadingDisplay>{this.state.loadingText}</LoadingDisplay>;
		}

		buildButtonOverlay() {
			return <ButtonOverlay {...this.state.buttonOverlayData} />;
		}

		render() {
			let extraDisplay = null;

			if (this.state.loadingText !== null) {
				extraDisplay = this.buildLoadingDisplay();
			}
			else if (this.state.buttonOverlayData) {
				extraDisplay = this.buildButtonOverlay();
			}

			return (
				<>
					{extraDisplay}
					<WrappedComponent {...this.props} loadable={this.loadable} />
				</>
			);
		}
	};
}
