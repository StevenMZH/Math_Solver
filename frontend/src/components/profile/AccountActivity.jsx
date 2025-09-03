import { useAccountContext } from '../../context/accountContext';
import CourseProfileLink from '../courses/CourseProfileLink';

export function AccountActivity({ contentProgress }) {
    const { language } = useAccountContext();
    
    return (
        <>
            {contentProgress?.map(record => {
                const data = record.content_object_data;
                const name = data?.name?.[language] || 'No name';
                const description = data?.description?.[language] || 'No description';

                return (
                    <CourseProfileLink 
                        key={data.id}
                        name={name}
                        description={description}
                        type={data?.field || data?.type || 'unknown'} 
                        classes={data?.units?.length || 0} 
                        finished={data?.units?.length }
                    />
                );
            })}
        </>
    );
}

export default AccountActivity;
