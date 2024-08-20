/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Toast } from 'native-base';
import LoadingDisplay from './LoadingDisplay';
import ButtonOverlay from './ButtonOverlay';

/**
* Higher Order Component function - "With Data Essential Meta Components"
* Adds LoadingDisplay, ButtonOverlay, and Toast functionanlity to components. allowing them to show
* loadng screens, button overlays (modal), and toast messages without needing to manage
* the state and callbacks for these.
*
* LoadingDisplay is frequently used in CRUD data operations
* ButtonOverlay is frequently used in data operations for user confirmation
* Toast is frequently used to show success or faliure messages of a data operation
*/
export default function WithDataMeta(WrappedComponent) {
	return class DataMetaComponent extends React.Component {
		constructor(props) {
			super(props);

			this.showLoading = this.showLoading.bind(this);
			this.hideLoading = this.hideLoading.bind(this);
			this.toastSuccess = this.toastSuccess.bind(this);
			this.toastDanger = this.toastDanger.bind(this);
			this.buttonOverlay = this.buttonOverlay.bind(this);
			this.closeButtonOverlay = this.closeButtonOverlay.bind(this);
			this.dataMeta = {
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
			this.dataMeta.visibleDisplays.loading = true;
			this.setState({ loadingText });
		}

		hideLoading() {
			this.dataMeta.visibleDisplays.loading = false;
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

			this.dataMeta.visibleDisplays.buttonOverlay = true;
			this.setState({ buttonOverlayData });
		}

		closeButtonOverlay() {
			this.dataMeta.visibleDisplays.buttonOverlay = false;
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
					<WrappedComponent {...this.props} dataMeta={this.dataMeta} />
				</>
			);
		}
	};
}
