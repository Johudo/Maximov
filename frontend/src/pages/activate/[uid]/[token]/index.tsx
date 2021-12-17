import { NextPage, NextPageContext } from "next";
import { wrapper } from "../../../../store";

const ActivateEmail: NextPage<ActivateEmailProps> = (props: ActivateEmailProps) => {
    return <></>;
};

ActivateEmail.getInitialProps = wrapper.getInitialPageProps((store) => async (context: NextPageContext) => {
    context.res?.writeHead(308, {
        Location: "/?activate=" + JSON.stringify({ uid: context.query.uid, token: context.query.token }),
    });
    context.res?.end();

    return {} as ActivateEmailProps;
});

type ActivateEmailProps = {};

export default ActivateEmail;
