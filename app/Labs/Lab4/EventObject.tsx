import { useState } from "react";
export default function EventObject() {
    const [event, setEvent] = useState<object | null>(null);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const eventCopy = {
            _reactName: (e as unknown as { _reactName: string })._reactName,
            _targetInst: null,
            type: e.type,
            nativeEvent: {
                isTrusted: e.nativeEvent.isTrusted,
            },
            target: e.currentTarget.outerHTML,
            currentTarget: null,
            eventPhase: e.eventPhase,
            bubbles: e.bubbles,
            cancelable: e.cancelable,
            timeStamp: e.timeStamp,
            defaultPrevented: e.defaultPrevented,
            isTrusted: e.isTrusted,
            detail: e.detail,
            screenX: e.screenX,
            screenY: e.screenY,
            clientX: e.clientX,
            clientY: e.clientY,
            pageX: e.pageX,
            pageY: e.pageY,
            button: e.button,
            buttons: e.buttons,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey,
        };
        setEvent(eventCopy);
    };
    return (
        <div>
            <h2>Event Object</h2>
            <button
                onClick={(e) => handleClick(e)}
                className="btn btn-primary"
                id="wd-display-event-obj-click"
            >
                Display Event Object
            </button>
            <pre>{JSON.stringify(event, null, 2)}</pre>
            <hr />
        </div>
    );
}
