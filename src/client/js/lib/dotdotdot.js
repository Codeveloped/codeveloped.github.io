
export default function (text, limit, dotdotdot) {
    if (!dotdotdot) dotdotdot = '...';
    if (text.length > limit) {
        return text.slice(0, limit) + dotdotdot;
    }
    return text;
}
