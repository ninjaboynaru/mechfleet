import React from 'react';
import ConfirmationModal from './ConfirmationModal';

/**
* @HOC
* Passes showModal and hideModal functons to the wrapped component as props.
* The wrapped component does not need to handle closing the modal on confirm or cancle, this HOC will do so
* automaticaly.
*
* @function showModal - function passed as prop to wrapped component
* @arg {string} titleText
* @arg {string} bodyText
* @arg {string} cancelText
* @arg {string} confirmText
* @arg {Function} onConfirm - Optional
* @arg {Functoin} onConfirm - Optional
*
* @function hideModal - function passed as prop to wrapped component
*/
function WithConfirmationModal(WrappedComponent) {
	return class ConfirmationModalWrapped extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				titleText: null,
				bodyText: null,
				cancelText: null,
				confirmText: null,
				onCancel: null,
				onConfirm: null,
				showModal: false
			};

			this.showModal = this.showModal.bind(this);
			this.hideModal = this.hideModal.bind(this);
			this.internalOnCancel = this.internalOnCancel.bind(this);
			this.internalOnConfirm = this.internalOnConfirm.bind(this);
		}

		showModal(titleText, bodyText, cancelText, confirmText, onCancel, onConfirm) {
			this.setState({ showModal: true, titleText, bodyText, cancelText, confirmText, onCancel, onConfirm });
		}

		hideModal() {
			this.setState({
				showModal: false,
				titleText: null,
				bodyText: null,
				cancelText: null,
				confirmText: null,
				onCancel: null,
				onConfirm: null
			});
		}

		internalOnCancel() {
			if (this.state.onCancel) {
				this.state.onCancel();
			}

			this.hideModal();
		}

		internalOnConfirm() {
			if (this.state.onConfirm) {
				this.state.onConfirm();
			}

			this.hideModal();
		}

		render() {
			let modal = null;
			const { titleText, bodyText, cancelText, confirmText } = this.state;

			if (this.state.showModal === true) {
				const modalProps = {
					titleText,
					bodyText,
					cancelText,
					confirmText,
					onCancel: this.internalOnCancel,
					onConfirm: this.internalOnConfirm
				};

				modal = <ConfirmationModal {...modalProps} />;
			}

			return (
				<>
					{modal}
					<WrappedComponent showModal={this.showModal} hideModal={this.hideModal} {...this.props} />
				</>
			);
		}
	};
}

export default WithConfirmationModal;
