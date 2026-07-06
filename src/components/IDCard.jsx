import './IDCard.css';

export default function IDCard({
  profilePhoto,
  name = 'Justine Rhey',
  handle = '@justrhey',
  roles = ['Backend Dev', 'AI Engineer'],
}) {
  return (
    <div className="id-card">
      <div className="id-card-top">
        <img src={profilePhoto} alt={name} className="id-card-photo" />
        <div className="id-card-info">
          <h3 className="id-card-name">{name}</h3>
          <span className="id-card-handle">{handle}</span>
        </div>
      </div>

      <div className="id-card-roles">
        {roles.map((role) => (
          <span key={role} className="id-card-role">{role}</span>
        ))}
      </div>

      <div className="id-card-footer">
        <span className="id-card-id">JR-2025-001</span>
        <span className="id-card-location">MANILA, PH</span>
      </div>
    </div>
  );
}
