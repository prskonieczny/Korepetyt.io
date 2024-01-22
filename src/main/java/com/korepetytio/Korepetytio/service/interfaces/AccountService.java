package com.korepetytio.Korepetytio.service.interfaces;

import com.korepetytio.Korepetytio.dto.request.ChangeOwnPasswordRequest;
import com.korepetytio.Korepetytio.dto.request.EditOwnAccountDetailsRequest;
import com.korepetytio.Korepetytio.dto.request.EditOwnEmailRequest;
import com.korepetytio.Korepetytio.dto.response.ShowAccountResponse;

import java.util.List;

public interface AccountService {
    List<ShowAccountResponse> getAllAccounts();
    List<ShowAccountResponse> getAllTeachers();
    List<ShowAccountResponse> getAllStudents();
    void addAdminRole(Long id);
    void removeAdminRole(Long id);
    ShowAccountResponse retrieveCurrentUserDetails();
    ShowAccountResponse retrieveOtherUserDetails(Long id);
    void changeOwnPassword(ChangeOwnPasswordRequest changeOwnPasswordRequest);
    void editOwnAccountDetails(EditOwnAccountDetailsRequest editOwnAccountDetailsRequest);
    void editOwnEmail(EditOwnEmailRequest editOwnEmailRequest);
    void deleteAccount(Long accountId);
}
