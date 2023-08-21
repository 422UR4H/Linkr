import { ThreeDots } from "react-loader-spinner";
import Button from "../../Styles/Button.js";

export default function ButtonSubmit({ disabled, datatest, children }) {
    return (
        <Button type="submit" disabled={disabled} data-test={datatest}>
            {disabled ?
                <ThreeDots
                    height="35"
                    color="white"
                    ariaLabel="three-dots-loading"
                />
                :
                children
            }
        </Button>
    );
}
ButtonSubmit.defaultPropt = { disabled: false };