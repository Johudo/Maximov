import { NextPage, NextPageContext } from "next";
import { wrapper } from "../../../../../../store";

const ResetPasswordConfirm: NextPage<ResetPasswordConfirmProps> = (props: ResetPasswordConfirmProps) => {
    return <></>;
};

ResetPasswordConfirm.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    context.res?.writeHead(308, {
        Location: "/?resetPassword=" + JSON.stringify({ uid: context.query.uid, token: context.query.token }),
    });
    context.res?.end();

    return {} as ResetPasswordConfirmProps;
});

type ResetPasswordConfirmProps = {};

export default ResetPasswordConfirm;
